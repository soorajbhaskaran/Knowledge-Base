# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do

  end
  namespace :api do
    resources :articles, except: %i[new edit], param: :identifier, defaults: { format: :json } do
      collection do
        get :search
        post :filter
      end
    end
    resources :categories, except: %i[new edit show], defaults: { format: :json } do
      collection do
        get :search
        patch :sort
      end
    end
    resources :redirections, except: %i[new edit show], defaults: { format: :json }
    resource :organization, only: %i[update create show], defaults: { format: :json }

    namespace :public do
      resources :categories, only: %i[index], defaults: { format: :json }
      resource :session, only: %i[create], defaults: { format: :json }
      resources :articles, only: %i[show], param: :slug, defaults: { format: :json }
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
