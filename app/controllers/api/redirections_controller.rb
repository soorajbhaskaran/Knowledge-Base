# frozen_string_literal: true

class API::RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[update destroy]
  before_action :check_for_redirection_loop, only: %i[create update]

  def index
    @redirections = current_user.redirections
  end

  def create
    current_user.redirections.create! redirection_params
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def update
    @redirection.update! redirection_params
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_deleted", entity: "Redirection"))
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_path, :to_path)
    end

    def load_redirection!
      @redirection = current_user.redirections.find(params[:id])
    end

    def check_for_redirection_loop
      return if Redirection.where(from_path: redirection_params[:to_path], user: current_organization.users).empty?

      respond_with_error(t("redirections.not_cyclic"))
    end
end
