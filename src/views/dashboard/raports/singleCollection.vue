<template>
	<div class="container" v-if="colData.loaded">
		<v-card flat tile>
			<v-toolbar color="primary" flat rounded>
				<v-toolbar-title class="font-weight-bold"
					>Collection de {{ collectionData.collection_date | formatDate }}
				</v-toolbar-title>

				<v-spacer></v-spacer>

				<v-btn
					depressed
					color="primary darken-2"
					rounded
					v-if="collectionData.verified"
				>
					<v-icon left>mdi-checkbox-marked-circle</v-icon>
					vérifié
				</v-btn>
				<v-btn depressed color="primary darken-2" rounded v-else>
					<v-icon left>mdi-checkbox-blank-circle</v-icon>
					marquer comme vérifié
				</v-btn>
			</v-toolbar>
		</v-card>
		<!---------------------------------------------------------------- end of collection title -------------------------------------------->
		<!---------------------------------------------------------------- the adding the collection components -------------------------------------------->
		<v-row wrap>
			<v-col cols="12" md="8">
				<div class="comps-container">
					<div class="main-title">
						<h2>EN DÉTAILS</h2>
					</div>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "single-collection",
	props: ["colid"],

	computed: mapState({
		collectionData: (state) => state.collectionData,
		moyenneEpargne: (state) => state.moyenneEpargne,
		montPerCredit: (state) => state.montPerCredit,
		tauxInterets: (state) => state.group.tauxInterets,
		totalReb: (state) => state.totalReb,
		totalCredit: (state) => state.totalCredit,
		colData: (state) => state.colData,
	}),

	mounted() {
		this.getInfo();
	},

	methods: {
		getInfo() {
			this.$store.dispatch("collectionGet", this.colid);
		},
	},
};
</script>

<style lang="scss" scoped>
.comps-container {
	background: #fffbfb;
	border: 1px solid #8d8d8d;
	box-sizing: border-box;
	border-radius: 6px;
  padding:15px;
  margin-top: 20px;
}
</style>
