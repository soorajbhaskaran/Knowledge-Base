# frozen_string_literal: true

class PreferencesController < ApplicationController
  before_action :load_preference!, only: [:show, :update, :create]

  def show
    render json: { preference: @preference }
  end

  def create
    puts @preference.inspect
    puts @preference.authenticate(preference_params[:password])
    unless @preference.authenticate(preference_params[:password])
      respond_with_error("Incorrect password, try again.", :unauthorized)
    end
  end

  def update
    @preference.update!(preference_params)
    respond_with_success(t("successfully_updated", entity: "Your preference"))
  end

  private

    def preference_params
      params.require(:preference).permit(:name, :password, :active)
    end

    def load_preference!
      @preference = Preference.all.first
    end
end
