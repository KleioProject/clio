defmodule ClioWeb.Context do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(%{cookies: %{"token" => token}} = conn, :clio) do
    {:ok, user} = Phoenix.Token.verify(ClioWeb.Endpoint, "The salt bro", token)
    IO.puts "asd"
    put_private(conn, :absinthe, %{context: %{current_user: user}})
  end

  def call(%{}, :gql) do
  end

  def call(conn, _) do
    conn
  end
end
