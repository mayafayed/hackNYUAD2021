from Main.api.reviewsApi import GetReviewApi, PostReviewApi

def initialize_routes(api):
    api.add_resource(GetReviewApi,'/review/<professorName>/<className>')
    api.add_resource(PostReviewApi,'/review')