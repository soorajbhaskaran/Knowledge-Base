# frozen_string_literal: true

class PreferencesController < ApplicationController
  before_action :load_preference!, only: %i[show update]

  def show
    render json: { preference: @preference }
  end

  def update
    @preference.update!(preference_params)
    respond_with_success(t("successfully_updated", entity: "Your preference"))
  end

  private

    def preference_params
      params.require(:preference).permit(:name, :password, :is_password_protection_enabled)
    end

    def load_preference!
      @preference = Preference.all.first
    end
end
