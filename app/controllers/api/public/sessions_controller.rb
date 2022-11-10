# frozen_string_literal: true

class API::Public::SessionsController < ApplicationController
  def create
    unless organization.authenticate(login_params[:password])
      respond_with_error(t("session.incorrect_credentials"), :unauthorized)
    end
    @organization = organization
  end

  private

    def login_params
      params.require(:session).permit(:password)
    end
end
