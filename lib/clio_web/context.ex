defmodule ClioWeb.Context do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(%{cookies: %{"token" => token}}= conn, _) do
    user = Phoenix.Token.verify(ClioWeb.Endpoint, "The salt bro", token)
    put_private(conn, :absinthe, %{context: %{current_user: user}})
  end
  def call(conn, _), do: conn
end
