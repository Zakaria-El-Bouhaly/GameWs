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

        private string _gameId;

        public UserActionHandler(WebSocketHandler webSocketHandler, GameService gameService)
        {
            _webSocketHandler = webSocketHandler;
            _gameService = gameService;
            _gameId = string.Empty;
        }

        public void SetGameId(string gameId)
        {
            _gameId = gameId;
        }

        public async Task Handle(WsRequest request)
        {
            // get game status isOver, isStarted, turn, movesCount
            JObject gameStatus = GameStatus();

            if (request.Action == "startGame" || request.Action == "restartGame")
            {
                int[] amounts = _gameService.InitializeGame();
                gameStatus = GameStatus();
                gameStatus.Add("amounts", JsonConvert.SerializeObject(amounts));
                await send("startGame", gameStatus);
            }

            if (request.Action == "selectBox")

            {
                // player selected a box
                int selected = int.Parse(request.Data);
                int amount = _gameService.SelectBox(selected);

                gameStatus = GameStatus();

                // if the game is over, send the initial selected amount
                gameStatus.Add("index", selected);
                if (amount != -1)
                    gameStatus.Add("amount", amount);
                else
                    gameStatus.Add("selected", _gameService.GetSelectedAmount());

                await send("revealBox", gameStatus);
            }

            if (request.Action == "ignoreOffer")
            {
                _gameService.ignoreOffer();
                gameStatus = GameStatus();
                await send("ignoreOffer", gameStatus);
            }

            if (request.Action == "makeOffer") // turn 2
            {
                // send offer to the other player
                gameStatus.Add("offer", request.Data);
                await send("makeOffer", gameStatus);
            }

            if (request.Action == "acceptOffer") // turn 1
            {
                _gameService.EndGame();
                gameStatus = GameStatus();
                gameStatus.Add("selected", _gameService.GetSelectedAmount());
                await send("acceptOffer", gameStatus);
            }

            if (request.Action == "refuseOffer") // turn 1
            {
                _gameService.refuseOffer();
                gameStatus = GameStatus();
                await send("refuseOffer", gameStatus);
            }

        }


        public JObject GameStatus()
        {
            JObject gameStatus = new JObject();
            gameStatus.Add("isStarted", _gameService.IsStarted());
            gameStatus.Add("isOver", _gameService.IsOver());
            gameStatus.Add("turn", _gameService.GetTurn());
            gameStatus.Add("movesCount", _gameService.GetMoves());

            return gameStatus;
        }

        public async Task send(string action, JObject data)
        {
            WsRequest response = new WsRequest(action, JsonConvert.SerializeObject(data));
            string responseString = JsonConvert.SerializeObject(response);
            await _webSocketHandler.SendToAllById(_gameId, responseString);
        }
    }
}