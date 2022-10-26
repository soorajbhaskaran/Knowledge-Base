# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  constraints(lambda { |req| req.format == :json }) do
      resources :articles, except: %i[new edit], param: :slug
      resources :categories, except: %i[new edit show] do
        collection do
          patch :sort
        end
      end
      resources :redirections, except: %i[new edit show]
      resource :preference, only: %i[update create show]

      namespace :public do
        resources :categories, only: %i[index]
        resource :sessions, only: %i[create]
        resources :articles, only: %i[show], param: :slug
      end
    end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
