defmodule Clio.Accounts.User do
  @derive [Poison.Encoder]
  use Ecto.Schema
  import Ecto.Changeset
  alias Clio.Accounts.User
  alias Comeonin.Argon2


  schema "users" do
    field :contact_email, :string
    field :contact_number, :string
    field :id_number, :string
    field :is_active, :boolean, default: false
    field :is_admin, :boolean, default: false
    field :is_supervisor, :boolean, default: false
    field :first_name, :string
    field :last_name, :string
    field :login_email, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    belongs_to :faculty, Clio.Administrative.Faculty

    timestamps()
  end

  @create_fields [:login_email,
                  :password_hash,
                  :first_name,
                  :last_name,
                  :id_number,
                  :contact_email,
                  :contact_number]

  @doc false
  def create_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, @create_fields)
    |> validate_required(@create_fields)
    |> put_password_hash()
    |> unique_constraint(:login_email)
  end

  @doc false
  def activate_changeset(%User{} = user, _attrs) do
    change(user, %{is_active: true})
  end

  @doc false
  def update_self_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:password, :contact_email, :contact_number])
    |> put_password_hash()
  end

  @doc false
  def update_by_admin_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:is_supervisor, :is_admin])
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        change(changeset, Argon2.add_hash(password))
      _ ->
        changeset
    end
  end
end
