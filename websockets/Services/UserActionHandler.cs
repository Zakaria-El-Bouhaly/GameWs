using System.Net.WebSockets;
using lesgo.Domain.Dto;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace lesgo.Services
{
    public class UserActionHandler
    {

        private readonly WebSocketHandler _webSocketHandler;
        private readonly GameService _gameService;

        public UserActionHandler(WebSocketHandler webSocketHandler, GameService gameService)
        {
            _webSocketHandler = webSocketHandler;
            _gameService = gameService;
        }

        public async Task Handle(WebSocket webSocket, WsRequest request)
        {
            switch (request.Action)
            {
                case "selectBox":
                    int selected = int.Parse(request.Data);
                    int amount = _gameService.SelectBox(selected);

                    JObject boxInfo = new JObject();
                    boxInfo.Add("index", selected);
                    boxInfo.Add("amount", amount);

                    await send("revealBox", JsonConvert.SerializeObject(boxInfo));
                    break;
                default:
                    break;
            }

        }

        public async Task send(string action, string data)
        {
            WsRequest response = new WsRequest(action, data);
            string responseString = JsonConvert.SerializeObject(response);
            await _webSocketHandler.SendMessageToAllAsync(responseString);
        }
    }
}