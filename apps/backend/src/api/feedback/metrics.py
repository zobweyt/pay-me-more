from prometheus_client import Histogram

rating_histogram_1 = Histogram(
    "user_rating_1",
    "User rating submitted on the site on 1st time",
    buckets=[1, 2, 3, 4, 5],
)
rating_histogram_2 = Histogram(
    "user_rating_2",
    "User rating submitted on the site on 2nd time",
    buckets=[1, 2, 3, 4, 5],
)
rating_histogram_3 = Histogram(
    "user_rating_3",
    "User rating submitted on the site on 3rd time",
    buckets=[1, 2, 3, 4, 5],
)
