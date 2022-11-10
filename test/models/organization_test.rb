# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_organization_should_not_be_valid_and_saved_without_name
    @organization.name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_password_should_have_minimum_length
    @organization.update(is_password_protection_enabled: true)
    @organization.password = "a" * (Organization::MINIMUM_ORGANIZATION_PASSWORD_LENGTH - 1)
    assert_not @organization.valid?
  end

  def test_organization_password_should_contain_alphanumeric_characters
    @organization.update(is_password_protection_enabled: true)
    @organization.password = "a" * Organization::MINIMUM_ORGANIZATION_PASSWORD_LENGTH
    assert_not @organization.valid?
  end
end
