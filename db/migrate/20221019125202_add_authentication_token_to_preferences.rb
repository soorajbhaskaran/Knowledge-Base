# frozen_string_literal: true

class AddAuthenticationTokenToPreferences < ActiveRecord::Migration[6.1]
  def change
    add_column :preferences, :authentication_token, :string
  end
end
