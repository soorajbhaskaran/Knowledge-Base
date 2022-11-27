# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      resources :articles, except: %i[new edit] do
        collection do
          post :filter
          patch :sort
          patch :change_category
        end
      end
      resources :categories, except: %i[new edit show] do
        collection do
          patch :sort
        end
      end
      resources :redirections, except: %i[new edit show]
      resources :versions, only: %i[index show] do
        member do
          patch :restore
        end
      end
      resource :organization, only: %i[update create show]
      resource :user, only: %i[update show]
      namespace :public do
        resources :categories, only: %i[index]
        resource :session, only: %i[create]
        resources :articles, only: %i[show index], param: :slug
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
