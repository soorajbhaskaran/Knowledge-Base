# frozen_string_literal: true

class API::Public::SessionsController < ApplicationController
  def create
    unless current_organization.authenticate(login_params[:password])
      respond_with_error(t("session.incorrect_credentials"), :unauthorized)
    end
    @organization = current_organization
  end

  private

    def login_params
      params.require(:session).permit(:password)
    end
end
