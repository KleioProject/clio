defmodule Clio.Factory do
  use ExMachina.Ecto, repo: Clio.Repo

  alias Clio.Accounts.User

  def user_factory() do
    %User{
      contact_email: Faker.Internet.safe_email(),
      contact_number: Faker.Phone.EnGb.cell_number(),
      id_number: :rand.uniform(99999) |> to_string,
      first_name: Faker.Name.first_name,
      last_name: Faker.Name.last_name,
      login_email: Faker.Internet.email() |> String.replace(~r/@.*/, "@uni-sofia.bg"),
      password: Faker.String.base64(),
      faculty_id: :rand.uniform(16)
    }
  end
end
