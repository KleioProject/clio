defmodule ClioWeb.RedirectController do
  use ClioWeb, :controller

  def redirect_to_index(conn, _params) do
    redirect conn, to: "/clio"
  end
end
