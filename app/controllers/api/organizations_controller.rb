# frozen_string_literal: true

class API::OrganizationsController < ApplicationController
  def show
    current_organization
  end

  def update
    current_organization.update! organization_params
    respond_with_success(t("successfully_updated", entity: "Your organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password, :is_password_protection_enabled)
    end
end
