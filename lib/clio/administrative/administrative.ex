defmodule Clio.Administrative do
  @moduledoc """
  The Administrative context.
  """

  import Ecto.Query, warn: false
  alias Clio.Repo

  alias Clio.Administrative.Faculty

  @doc """
  Returns the list of faculties.

  ## Examples

      iex> list_faculties()
      [%Faculty{}, ...]

  """
  def list_faculties do
    Repo.all(Faculty)
  end

  @doc """
  Gets a single faculty.

  Raises `Ecto.NoResultsError` if the Faculty does not exist.

  ## Examples

      iex> get_faculty!(123)
      %Faculty{}

      iex> get_faculty!(456)
      ** (Ecto.NoResultsError)

  """
  def get_faculty!(id), do: Repo.get!(Faculty, id)

  @doc """
  Creates a faculty.

  ## Examples

      iex> create_faculty(%{field: value})
      {:ok, %Faculty{}}

      iex> create_faculty(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_faculty(attrs \\ %{}) do
    %Faculty{}
    |> Faculty.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a faculty.

  ## Examples

      iex> update_faculty(faculty, %{field: new_value})
      {:ok, %Faculty{}}

      iex> update_faculty(faculty, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_faculty(%Faculty{} = faculty, attrs) do
    faculty
    |> Faculty.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Faculty.

  ## Examples

      iex> delete_faculty(faculty)
      {:ok, %Faculty{}}

      iex> delete_faculty(faculty)
      {:error, %Ecto.Changeset{}}

  """
  def delete_faculty(%Faculty{} = faculty) do
    Repo.delete(faculty)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking faculty changes.

  ## Examples

      iex> change_faculty(faculty)
      %Ecto.Changeset{source: %Faculty{}}

  """
  def change_faculty(%Faculty{} = faculty) do
    Faculty.changeset(faculty, %{})
  end
end
