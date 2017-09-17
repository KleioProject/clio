defmodule ClioWeb.PageController do
  use ClioWeb, :controller

  def index(conn, params) do
    result =  HTTPoison.get!("http://localhost:3003/#{Enum.join(["clio", params["path"]], "/")}")
    IO.puts(params["path"])
    conn
    |> html(result.body)
  end
end
