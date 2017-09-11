defmodule Clio.AdministrativeTest do
  use Clio.DataCase

  alias Clio.Administrative

  describe "faculties" do
    alias Clio.Administrative.Faculty

    @valid_attrs %{abbreviation: "some abbreviation", name: "some name"}
    @update_attrs %{abbreviation: "some updated abbreviation", name: "some updated name"}
    @invalid_attrs %{abbreviation: nil, name: nil}

    def faculty_fixture(attrs \\ %{}) do
      {:ok, faculty} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Administrative.create_faculty()

      faculty
    end

    test "list_faculties/0 returns all faculties" do
      faculty = faculty_fixture()
      assert Administrative.list_faculties() == [faculty]
    end

    test "get_faculty!/1 returns the faculty with given id" do
      faculty = faculty_fixture()
      assert Administrative.get_faculty!(faculty.id) == faculty
    end

    test "create_faculty/1 with valid data creates a faculty" do
      assert {:ok, %Faculty{} = faculty} = Administrative.create_faculty(@valid_attrs)
      assert faculty.abbreviation == "some abbreviation"
      assert faculty.name == "some name"
    end

    test "create_faculty/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Administrative.create_faculty(@invalid_attrs)
    end

    test "update_faculty/2 with valid data updates the faculty" do
      faculty = faculty_fixture()
      assert {:ok, faculty} = Administrative.update_faculty(faculty, @update_attrs)
      assert %Faculty{} = faculty
      assert faculty.abbreviation == "some updated abbreviation"
      assert faculty.name == "some updated name"
    end

    test "update_faculty/2 with invalid data returns error changeset" do
      faculty = faculty_fixture()
      assert {:error, %Ecto.Changeset{}} = Administrative.update_faculty(faculty, @invalid_attrs)
      assert faculty == Administrative.get_faculty!(faculty.id)
    end

    test "delete_faculty/1 deletes the faculty" do
      faculty = faculty_fixture()
      assert {:ok, %Faculty{}} = Administrative.delete_faculty(faculty)
      assert_raise Ecto.NoResultsError, fn -> Administrative.get_faculty!(faculty.id) end
    end

    test "change_faculty/1 returns a faculty changeset" do
      faculty = faculty_fixture()
      assert %Ecto.Changeset{} = Administrative.change_faculty(faculty)
    end
  end
end
