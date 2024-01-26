from src.recommenders.recommender import Recommender
from lenskit.algorithms import item_knn, Recommender as LenskitRecommender
from src.utils import process_parameters
import pandas as pd


class ItemKNN(Recommender):
    def __init__(self, parameters: dict) -> None:
        default_keys = set()
        parameters = process_parameters(parameters, default_keys)

    def recommend(self, users, n, candidates=None, ratings=None) -> pd.DataFrame:
        raise NotImplementedError

    def predict(self, pairs, ratings):
        raise NotImplementedError

    def predict_for_user(self, user, items, ratings):
        raise NotImplementedError

    def fit(self, rating, **kwargs) -> None:
        raise NotImplementedError

    def get_params(self, deep=True):
        raise NotImplementedError


class LenskitItemKNN(ItemKNN):
    def __init__(self, parameters: dict) -> None:
        super().__init__(parameters)
        default_keys = {
            'maxNumberNeighbors',
        }

        parameters = process_parameters(parameters, default_keys)
        self.max_number_neighbors = parameters.get('maxNumberNeighbors')
        self.min_number_neighbors = parameters.get('minNumberNeighbors', 1)
        self.save_nbrs = parameters.get('saveNeighbors', None)
        self.feedback = parameters.get('feedback', 'explicit')
        self.aggregate = parameters.get('aggregate', 'weighted-average')
        self.use_ratings = parameters.get('use_ratings', True)
        self.min_sim = parameters.get('min_sim', 0.03)

        self.ItemKNN = item_knn.ItemItem(
            nnbrs=self.max_number_neighbors,
            min_nbrs=self.min_number_neighbors,
            save_nbrs=self.save_nbrs,
            min_sim=self.min_sim,
            feedback=self.feedback,
            aggregate=self.aggregate,
            use_ratings=self.use_ratings
        )
        self.ItemKNN = LenskitRecommender.adapt(self.ItemKNN)

    def predict_for_user(self, users, items, rating=None):
        return self.ItemKNN.predict_for_user(users, items, rating)

    def predict(self, pairs, ratings=None):
        return self.ItemKNN.predict(pairs, ratings)

    def recommend(self, users, n, candidates=None, n_jobs=None) -> pd.DataFrame:
        recommendation_dataframe = pd.DataFrame(
            columns=['user', 'item', 'score', 'algorithm_name']
        )
        for user in users:
            recommendation_to_user = self.ItemKNN.recommend(user, n)

            names = pd.Series([self.__class__.__name__] * n)
            user_id_list = pd.Series([user] * n)

            recommendation_to_user['algorithm_name'] = names
            recommendation_to_user['user'] = user_id_list

            recommendation_dataframe = pd.concat(
                [recommendation_dataframe, recommendation_to_user],
                ignore_index=True
            )

        return recommendation_dataframe

    def fit(self, rating, **kwargs) -> None:
        self.ItemKNN.fit(rating)

    def get_params(self, deep=True):
        pass

    @property
    def recommender(self):
        return self.ItemKNN
