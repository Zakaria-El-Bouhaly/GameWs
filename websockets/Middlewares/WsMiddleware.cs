using System.Net.WebSockets;
using lesgo.Services;

namespace lesgo.Middlewares
{
    public class WsMiddleware
    {
        private readonly RequestDelegate _next;

        public WsMiddleware(RequestDelegate next)
        {
            _next = next;
        }



        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
                return;
                        
        }

    }
}