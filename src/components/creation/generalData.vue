<template>
	<div class="contents">
		<v-form @submit.prevent class="data-create-container" ref="dataForm">
			<v-row class="wrap my-4">
				<v-col cols="12">
					<h3>Reference du groupe</h3>
				</v-col>
				<v-col cols="12" md="4">
					<div class="form-col">
						<div class="col-title">
							<p>Date de collection</p>
						</div>
						<div class="fields">
							<v-menu
								ref="menu"
								v-model="menu"
								:close-on-content-click="false"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="collectionDate"
										label="cliquez pour sélectionner la date"
										dense
										:rules="[rules.required]"
										filled
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									ref="picker"
									v-model="collectionDate"
									@change="save"
								></v-date-picker>
							</v-menu>
						</div>
					</div>
				</v-col>

				<v-col cols="12" md="4">
					<div class="form-col">
						<div class="col-title">
							<p>Sélectionnez un groupe</p>
						</div>
						<div class="fields">
							<v-select
								:items="groups"
								label="Sélectionnez un groupe"
								append-icon="mdi-account-group"
								filled
								item-text="name"
								item-value="id"
								:rules="[rules.required]"
								dense
								v-model="groupId"
							></v-select>
						</div>
					</div>
				</v-col>

				<v-col cols="12" md="4">
					<div class="form-col">
						<div class="col-title">
							<p>Nouveaux membres enregistrés dans le mois</p>
						</div>
						<div class="fields">
							<v-text-field
								v-model="newBoys"
								label="Garçons"
								:rules="[rules.required, rules.number]"
								clearable
								filled
								dense
								class="mx-2"
							></v-text-field>
							<v-text-field
								v-model="newGirls"
								label="Filles"
								clearable
								:rules="[rules.required]"
								filled
								type="number"
								dense
								class="mx-2"
							></v-text-field>
						</div>
					</div>
				</v-col>
			</v-row>

			<v-btn
				color="primary"
				type="submit"
				depressed
				rounded
				@click="saveGenInfo()"
			>
				Continue
			</v-btn>
		</v-form>
	</div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";
import ActionsService from "@/services/actions.service";
export default {
	data: () => ({
		menu: false,
		groups: [],
		stepy: 2,
		commonRules: [(v) => v.length <= 1 || "Max 25 characters"],
		// data to be collected
		collectionDate: "",
		groupId: 0,
		newBoys: 0,
		newGirls: 0,
		abandonedGirls: 0,
		abandonedBoys: 0,
		attendedBoys: 0,
		collectorName: "",

		// validation rules
		rules: {
			required: (value) => !!value || "obligatoire!",
			// number: v => {
      //   // add the number validationthings
      // }
		},
	}),

	watch: {
		menu(val) {
			val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
		},
	},

	mounted() {
		ActionsService.getGroupes().then((response) => {
			this.groups = response.data.data;
			this.collectorName = this.UserInfo.username;
		});
	},

	computed: mapState(["UserInfo"]),
	methods: {
		save(collectionDate) {
			this.$refs.menu.save(collectionDate);
		},

		browserSave(keyname, value) {
			localStorage.setItem(keyname, value);
		},

		saveGenInfo() {
			// do validation first
			if (this.$refs.dataForm.validate()) {
				const formData = {
					//  to be added soon
					groupId: this.groupId,
					collectionDate: this.collectionDate,
				};

				console.log(formData);
				// post data to the server
				// ActionsService.SaveGenInfo(formData).then((response) => {
				// 	// save collection id in localStorage,for later usage
				// 	let collectionId = response.data.data.id;
				// 	this.browserSave("collectionId", collectionId);
				// 	store.commit("updateSteps", this.stepy);
				// });
			}
		},

		moveStep(stepy) {
			store.commit("updateSteps", stepy);
		},

		clear() {
			this.collectionDate = null;
		},
	},
};
</script>

<style scoped>
.col-title {
	font-size: 14px;
	color: rgb(91, 91, 91);
	font-style: italic;
}

.form-col {
	border-radius: 6px;
	border: 1px dotted #066726;
	margin: 2px;
	padding: 5px;
}

.form-col .fields {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: flex-end;
}
</style>
