defmodule Clio.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :login_email, :string, null: false
      add :password_hash, :string, null: false
      add :first_name, :string, null: false
      add :last_name, :string, null: false
      add :id_number, :string, null: false
      add :contact_email, :string, null: false
      add :contact_number, :string, null: false
      add :is_active, :boolean, default: false, null: false
      add :is_supervisor, :boolean, default: false, null: false
      add :is_admin, :boolean, default: false, null: false
      add :faculty_id, references(:faculties, on_delete: :nilify_all)

      timestamps()
    end

    create unique_index(:users, [:login_email])
    create index(:users, [:faculty_id])
  end
end
