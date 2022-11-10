# frozen_string_literal: true

class AddAuthenticationTokenToOrganization < ActiveRecord::Migration[6.1]
  def change
    add_column :organizations, :authentication_token, :string
  end
end
