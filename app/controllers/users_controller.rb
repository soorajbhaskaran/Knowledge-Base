# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    render status:ok, json::Hi
  end
end
