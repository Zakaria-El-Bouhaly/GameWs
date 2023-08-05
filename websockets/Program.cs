using System.Reflection;
using lesgo.Services;
using Microsoft.AspNetCore.WebSockets;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<ConnectionManager>();

builder.Services.AddSingleton<WebSocketHandler>();
builder.Services.AddSingleton<GameService>();
builder.Services.AddSingleton<UserActionHandler>();


builder.Services.AddControllers();

var app = builder.Build();

var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

app.UseWebSockets(webSocketOptions);
// use when hitting the endpoint

app.MapControllers();




app.UseMiddleware<WebSocketMiddleware>();



app.Run();
