# frozen_string_literal: true

class SeedOrganizationIdWithOrganizationDetails < ActiveRecord::Migration[6.1]
  def up
    Redirection.find_each do |redirection|
      redirection.update! organization_id: Organization.first.id
    end
  end

  def down
    Redirection.find_each do |redirection|
      redirection.update! organization_id: nil
    end
  end
end
