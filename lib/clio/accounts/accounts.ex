defmodule Clio.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Clio.Repo

  alias Clio.Accounts.{User}

  def list_users do
    Repo.all(User)
  end

  def get_user!(id), do: Repo.get!(User, id)

  def create_user(attrs \\ %{}) do
    %User{}
    |> User.create_changeset(attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.update_self_changeset(attrs)
    |> Repo.update()
  end

  def verify_user(%{"password" => pass, "email" => login_email}) do
    case Repo.get_by(User, login_email: login_email) |> Comeonin.Pbkdf2.check_pass(pass) do
      {:ok, user} ->
        {:ok, Map.take(user, [:id, :first_name, :last_name, :is_admin, :is_supervisor, :is_active])}
      {:error, _message} ->
        {:error,"Грешен имеил или парола!"}
    end
  end

  def search_users(search_term) do
    (from u in User,
      order_by: fragment("similarity(?, ?) DESC", u.search_name, ^search_term),
      limit: 10)
    |> Repo.all
  end
end
