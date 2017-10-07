defmodule Clio.Accounts.User do
  @derive [Poison.Encoder]
  use Ecto.Schema
  import Ecto.Changeset
  alias Clio.Accounts.User
  alias Comeonin.Pbkdf2


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
    field :search_name, :string

    belongs_to :faculty, Clio.Administrative.Faculty

    timestamps()
  end

  @create_fields [:login_email,
                  :password,
                  :first_name,
                  :last_name,
                  :id_number,
                  :contact_email,
                  :contact_number,
                  :faculty_id]

  @doc false
  def create_changeset(user, attrs) do
    user
    |> cast(attrs, @create_fields)
    |> validate_required(@create_fields)
    |> put_search()
    |> put_password_hash()
    |> unique_constraint(:login_email)
    |> activate_changeset()
  end

  @doc false
  def activate_changeset(user) do
    change(user, %{is_active: true})
  end

  @doc false
  def update_self_changeset(user, attrs) do
    user
    |> cast(attrs, [:password, :contact_email, :contact_number])
    |> put_password_hash()
  end

  @doc false
  def update_by_admin_changeset(user, attrs) do
    user
    |> cast(attrs, [:is_supervisor, :is_admin])
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true} = changeset) do
    case get_field(changeset, :password, nil) do
      nil ->
        changeset
      pass ->
        change(changeset, Pbkdf2.add_hash(pass))
    end
  end
  defp put_password_hash(changeset), do: changeset

  defp put_search(%Ecto.Changeset{valid?: true} = changeset) do
    try do
      faculty = Clio.Administrative.get_faculty!(get_field(changeset, :faculty_id))
      change(changeset, %{search_name: construct_search(changeset, faculty)})
    rescue
      _ -> %{changeset | :valid? => false}
    end
  end
  defp put_search(changeset), do: changeset

  defp construct_search(changeset, faculty) do
    [get_field(changeset, :first_name),
     get_field(changeset, :last_name),
     faculty.abbreviation,
     get_field(changeset, :id_number)] |> Enum.join(" ")
  end
end
