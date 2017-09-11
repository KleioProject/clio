defmodule ClioWeb.Router do
  use ClioWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :graphql do
    # plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    # plug Guardian.Plug.LoadResource
    # plug RakiaWeb.Context
  end

  # scope "/", ClioWeb do
  #   pipe_through :browser # Use the default browser stack

  #   get "/", PageController, :index
  # end

  scope "/gql" do
    pipe_through [:api, :graphql]

    forward "/", Absinthe.Plug, schema: ClioWeb.Schema
  end

  scope "/graphiql" do
    pipe_through :api

    forward "/", Absinthe.Plug.GraphiQL,
      schema: ClioWeb.Schema,
      # interface: :simple,
      context: %{pubsub: RakiaWeb.Endpoint}
  end
end
