# frozen_string_literal: true

json.user do
  json.name "#{@user.first_name} #{@user.last_name}"
  json.info @user.info
end
