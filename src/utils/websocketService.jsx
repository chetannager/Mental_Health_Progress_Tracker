class WebSocketService {
  constructor() {
    this.socket = null;
    this.url = "ws://your-websocket-server-url";
    this.reconnectInterval = 5000;
    this.shouldReconnect = false;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  connect() {
    if (!this.token) {
      console.error("WebSocket connection attempted without token");
      return;
    }

    this.socket = new WebSocket(`${this.url}`, [
      "Authorization",
      "Bearer " + this.token,
    ]);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      console.log("Message from server ", event.data);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
      if (this.shouldReconnect) {
        setTimeout(() => {
          this.connect();
        }, this.reconnectInterval);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };
  }

  disconnect() {
    this.shouldReconnect = false;
    if (this.socket) {
      this.socket.close();
    }
  }

  enableReconnection() {
    this.shouldReconnect = true;
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
