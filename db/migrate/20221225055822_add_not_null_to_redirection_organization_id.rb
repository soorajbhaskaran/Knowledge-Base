# frozen_string_literal: true

class AddNotNullToRedirectionOrganizationId < ActiveRecord::Migration[6.1]
  def change
    change_column_null :redirections, :organization_id, false
  end
end
