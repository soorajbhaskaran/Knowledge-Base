# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @author = create(:user, organization: @organization)
    @headers = headers(@organization)
  end

  def test_should_show_valid_organization
    get api_organization_path, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["organization"]["id"], @organization.id
  end

  def test_should_update_organization_entities
    patch api_organization_path, params: { organization: { name: "Updated", password: "welcome12345" } },
      headers: @headers
    assert_response :success
    assert_equal "Updated", @organization.reload.name
  end

  def test_users_must_be_able_authenticate_with_valid_organization_password
    put api_organization_path, params: { organization: { password: "welcome12345" } }, headers: @headers
    assert_response :success
    assert @organization.reload.authenticate("welcome12345")
  end
end
