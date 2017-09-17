defmodule ClioWeb.AccountControler do
  use ClioWeb, :controller
  alias Clio.Accounts

  def login(conn, params) do
    with {:ok, user} <- Accounts.verify_user(params) do
      token = Phoenix.Token.sign(ClioWeb.Endpoint, "The salt bro", user)
      conn
      |> put_resp_cookie("token", token)
      |> json(user |> prepare_keys)
    else
      {:error, message} ->
        conn
        |> put_status(401)
        |> json(%{error: %{message: message}})
    end
  end

  defp prepare_keys(%{} = map) do
    map
    |> Enum.map(fn {key, value} -> {key |> Atom.to_string |> Inflex.camelize(:lower) , value} end)
    |> Map.new()
  end
end
