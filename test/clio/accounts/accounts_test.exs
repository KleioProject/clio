defmodule Clio.AccountsTest do
  use Clio.DataCase

  alias Clio.Accounts

  describe "users" do
    alias Clio.Accounts.User

    @valid_attrs %{active: true, admin: true, contact_email: "some contact_email", contact_number: "some contact_number", first_name: "some first_name", last_name: "some last_name", login_email: "some login_email", password_hash: "some password_hash", supervisor: true, university_id: "some university_id"}
    @update_attrs %{active: false, admin: false, contact_email: "some updated contact_email", contact_number: "some updated contact_number", first_name: "some updated first_name", last_name: "some updated last_name", login_email: "some updated login_email", password_hash: "some updated password_hash", supervisor: false, university_id: "some updated university_id"}
    @invalid_attrs %{active: nil, admin: nil, contact_email: nil, contact_number: nil, first_name: nil, last_name: nil, login_email: nil, password_hash: nil, supervisor: nil, university_id: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      assert user.active == true
      assert user.admin == true
      assert user.contact_email == "some contact_email"
      assert user.contact_number == "some contact_number"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert user.login_email == "some login_email"
      assert user.password_hash == "some password_hash"
      assert user.supervisor == true
      assert user.university_id == "some university_id"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.active == false
      assert user.admin == false
      assert user.contact_email == "some updated contact_email"
      assert user.contact_number == "some updated contact_number"
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
      assert user.login_email == "some updated login_email"
      assert user.password_hash == "some updated password_hash"
      assert user.supervisor == false
      assert user.university_id == "some updated university_id"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end
  end
end
