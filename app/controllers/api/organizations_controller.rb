# frozen_string_literal: true

class API::OrganizationsController < ApplicationController
  def show
    render json: { organization: organization }
  end

  def update
    organization.update!(organization_params)
    respond_with_success(t("successfully_updated", entity: "Your organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name, :password, :is_password_protection_enabled)
    end
end
