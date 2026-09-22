import API from './api';

describe('API.DataPutFile upload progress', () => {
	let originalXMLHttpRequest;

	beforeEach(() => {
		originalXMLHttpRequest = global.XMLHttpRequest;
	});

	afterEach(() => {
		global.XMLHttpRequest = originalXMLHttpRequest;
	});

	const installMock = ({ status = 200, statusText = 'OK', responseText = '', contentType = null, networkError = false } = {}) => {
		class MockXMLHttpRequest {
			constructor() {
				this.upload = {};
				this.headers = {};
				this.status = status;
				this.statusText = statusText;
				this.responseText = responseText;
				MockXMLHttpRequest.instance = this;
			}

			open(method, url) {
				this.method = method;
				this.url = url;
			}

			setRequestHeader(name, value) {
				this.headers[name] = value;
			}

			getResponseHeader(name) {
				return name.toLowerCase() === 'content-type' ? contentType : null;
			}

			send(data) {
				this.data = data;
				if (networkError) {
					this.onerror();
					return;
				}
				this.upload.onprogress({
					lengthComputable: true,
					loaded: 5,
					total: 10,
				});
				this.onload();
			}
		}

		global.XMLHttpRequest = MockXMLHttpRequest;
		return MockXMLHttpRequest;
	};

	test('reports upload progress and preserves authorization', async () => {
		const MockXMLHttpRequest = installMock();

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

	test('returns API JSON error details for failed uploads', async () => {
		installMock({
			status: 413,
			statusText: 'Payload Too Large',
			responseText: JSON.stringify({ code: 413, message: 'upload exceeds limit' }),
			contentType: 'application/json',
		});

		const api = new API('https://restreamer.example');
		api._error = jest.fn();

		const result = await api.DataPutFile('/channels/test/video.source', new Blob(['test']), () => {});

		expect(result).toEqual({
			err: { code: 413, message: 'upload exceeds limit' },
			val: null,
		});
		expect(api._error).toHaveBeenCalledWith('upload exceeds limit');
	});

	test('returns the same network error shape as the regular API path', async () => {
		installMock({ networkError: true });

		const api = new API('https://restreamer.example');
		api._error = jest.fn();

		const result = await api.DataPutFile('/channels/test/video.source', new Blob(['test']), () => {});

		expect(result).toEqual({
			err: { code: -1, message: 'Network error' },
			val: null,
		});
		expect(api._error).toHaveBeenCalledWith('Network error');
	});
});
