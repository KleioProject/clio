defmodule Clio.Administrative.Faculty do
  use Ecto.Schema
  import Ecto.Changeset
  alias Clio.Administrative.Faculty

  schema "faculties" do
    field :abbreviation, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(%Faculty{} = faculty, attrs) do
    faculty
    |> cast(attrs, [:name, :abbreviation])
    |> validate_required([:name, :abbreviation])
  end
end
