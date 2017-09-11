defmodule Clio.Repo.Migrations.CreateFaculties do
  use Ecto.Migration

  def change do
    create table(:faculties) do
      add :name, :string
      add :abbreviation, :string

      timestamps()
    end

  end
end
