defmodule Clio.Accounts.Session do
  def create({:error, message}) do
    {:error, "Грешен имеий или праола!"}
  end

  def create({:ok, user}) do
    token = create_token(user)
    {:ok, user, token}
  end

  defp create_token(user) do
    Phoenix.Token.sign(Clio)
  end
end
