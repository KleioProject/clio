defmodule ClioWeb.PageController do
  use ClioWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
