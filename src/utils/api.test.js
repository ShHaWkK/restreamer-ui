import API from './api';

describe('API.DataPutFile upload progress', () => {
	let originalXMLHttpRequest;

	beforeEach(() => {
		originalXMLHttpRequest = global.XMLHttpRequest;
	});

	afterEach(() => {
		global.XMLHttpRequest = originalXMLHttpRequest;
	});

	test('reports upload progress and preserves authorization', async () => {
		class MockXMLHttpRequest {
			constructor() {
				this.upload = {};
				this.headers = {};
				this.status = 200;
				this.statusText = 'OK';
				this.responseText = '';
				MockXMLHttpRequest.instance = this;
			}

			open(method, url) {
				this.method = method;
				this.url = url;
			}

			setRequestHeader(name, value) {
				this.headers[name] = value;
			}

			send(data) {
				this.data = data;
				this.upload.onprogress({
					lengthComputable: true,
					loaded: 5,
					total: 10,
				});
				this.onload();
			}
		}

		global.XMLHttpRequest = MockXMLHttpRequest;

		const api = new API('https://restreamer.example');
		api.SetToken('test-token');

		const progress = [];
		const data = new Blob(['test']);
		const result = await api.DataPutFile('/channels/test/video.source', data, (value) => progress.push(value));

		const request = MockXMLHttpRequest.instance;
		expect(request.method).toBe('PUT');
		expect(request.url).toBe('https://restreamer.example/api/v3/fs/disk/channels/test/video.source');
		expect(request.headers['Content-Type']).toBe('application/data');
		expect(request.headers.Authorization).toBe('Bearer test-token');
		expect(request.data).toBe(data);
		expect(progress).toEqual([50, 100]);
		expect(result.err).toBeNull();
	});
});
