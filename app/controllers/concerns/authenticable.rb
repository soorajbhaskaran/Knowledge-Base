# frozen_string_literal: true

module Authenticable
  extend ActiveSupport::Concern

  private

    def authenticate_end_user_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].to_s
      preference = Preference.all.first
      is_valid_token = auth_token && ActiveSupport::SecurityUtils.secure_compare(
        preference.authentication_token,
        auth_token)
      if !is_valid_token
        respond_with_error(t("session.could_not_auth"), :unauthorized)
      end
    end
end
