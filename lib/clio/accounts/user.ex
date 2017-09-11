defmodule Clio.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Clio.Accounts.User

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
    field :password_hash, :string

    belongs_to :faculty, Clio.Administrative.Faculty

    timestamps()
  end

  @doc false
  def create_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:login_email, :password_hash, :first_name, :last_name, :id_number, :contact_email, :contact_number, :is_active, :is_supervisor, :is_admin])
    |> validate_required([:login_email, :password_hash, :first_name, :last_name, :id_number, :contact_email, :contact_number, :is_active, :is_supervisor, :is_admin])
    |> unique_constraint(:login_email)
  end

  def update_self_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:password_hash, :first_name, :last_name, :contact_email, :contact_number])
  end

  def update_permisions_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:is_active, :is_supervisor, :is_admin])
  end
end
