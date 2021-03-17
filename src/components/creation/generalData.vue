<template>
	<div class="contents">
		<v-form @submit.prevent class="data-create-container" ref="dataForm">
			<v-row class="wrap my-4">
				<v-col cols="12">
					<h3>Membres du groupe</h3>
				</v-col>
				<v-col cols="12" md="6">
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

				<v-col cols="12" md="6">
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

				<v-col cols="12" md="6">
					<div class="form-col">
						<div class="col-title">
							<p>Membres inscrits dans le mois précédent</p>
						</div>
						<div class="fields">
							<v-text-field
								v-model="prevRegisteredBoys"
								label="Garçons"
								:rules="[rules.required]"
								clearable
								type="number"
								filled
								dense
								class="mx-2"
							></v-text-field>
							<v-text-field
								v-model="prevRegisteredGirls"
								label="Filles"
								clearable
								:rules="[rules.required]"
								filled
								type="number"
								dense
								class="mx-2"
							></v-text-field>
						</div>
						<v-chip color="black" dark>Total : {{ prevMembers }} </v-chip>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<div class="form-col">
						<div class="col-title">
							<p>Abandons au cours du mois actuel</p>
						</div>
						<div class="fields">
							<v-text-field
								v-model="abandonedBoys"
								label="Garçons"
								:rules="[rules.required]"
								clearable
								type="number"
								filled
								dense
								class="mx-2"
							></v-text-field>
							<v-text-field
								v-model="abandonedGirls"
								label="Filles"
								clearable
								:rules="[rules.required]"
								filled
								type="number"
								dense
								class="mx-2"
							></v-text-field>
						</div>
						<v-chip color="black" dark>Total : {{ abandonedMembers }} </v-chip>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<v-card flat>
						<v-card-title class="col-title">
							Taux d’abandon mensuel (%)
						</v-card-title>
						<v-card-text class="taux">
							<table width="100%">
								<tr>
									<td>boys</td>
									<td>{{ abandonboysTaux }}</td>
								</tr>
								<tr>
									<td colspan="2">
										<v-divider></v-divider>
									</td>
								</tr>
								<tr>
									<td>girls</td>
									<td>{{ abandongirlsTaux }}</td>
								</tr>
							</table>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col cols="12" md="6">
					<div class="form-col">
						<div class="col-title">
							<p>Nouveaux membres enregistrés dans le mois</p>
						</div>
						<div class="fields">
							<v-text-field
								v-model="newBoys"
								label="Garçons"
								:rules="[rules.required]"
								clearable
								type="number"
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
						<v-chip color="black" dark>Total : {{ newMembers }} </v-chip>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<div class="form-col">
						<div class="col-title">
							<p>Membres actuels inscrits</p>
						</div>
						<div class="fields">
							<v-text-field
								v-model="actualBoys"
								disabled
								label="Garçons"
								:rules="[rules.required]"
								clearable
								type="number"
								filled
								dense
								class="mx-2"
							></v-text-field>
							<v-text-field
								v-model="actualGirls"
								disabled
								label="Filles"
								clearable
								:rules="[rules.required]"
								filled
								type="number"
								dense
								class="mx-2"
							></v-text-field>
						</div>
						<v-chip color="black" dark>Total : {{ actualMembers }} </v-chip>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<div class="form-col">
						<div class="col-title">
							<p>
								Membres présents en réunion à la date de collecte de données
							</p>
						</div>
						<div class="fields">
							<v-text-field
								v-model="attendedBoys"
								label="Garçons"
								:rules="[rules.required]"
								clearable
								type="number"
								filled
								dense
								class="mx-2"
							></v-text-field>
							<v-text-field
								v-model="attendedGirls"
								label="Filles"
								clearable
								:rules="[rules.required]"
								filled
								type="number"
								dense
								class="mx-2"
							></v-text-field>
						</div>
						<v-chip color="black" dark>Total : {{ attendedMembers }} </v-chip>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<v-card flat>
						<v-card-title class="col-title">
							Taux de participation à la réunion
						</v-card-title>
						<v-card-text class="taux">
							<table width="100%">
								<tr>
									<td>boys</td>
									<td>{{ boysTaux }}</td>
								</tr>
								<tr>
									<td colspan="2">
										<v-divider></v-divider>
									</td>
								</tr>
								<tr>
									<td>girls</td>
									<td>{{ girlsTaux }}</td>
								</tr>
							</table>
						</v-card-text>
					</v-card>
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
		prevRegisteredBoys: 0,
		prevRegisteredGirls: 0,
		groupId: 0,
		newBoys: 0,
		newGirls: 0,
		abandonedGirls: 0,
		abandonedBoys: 0,
		attendedBoys: 0,
		attendedGirls: 0,
		collectorName: "",
		// validation rules
		rules: {
			required: (value) => !!value || "obligatoire!",
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

	computed: {
		UserInfo() {
			return this.$store.state.UserInfo;
		},
		actualGirls() {
			let prgils = parseInt(this.prevRegisteredGirls);
			let newgils = parseInt(this.newGirls);
			let abands = parseInt(this.abandonedGirls);
			// calculate the actual girls
			const actuals = prgils - abands + newgils;
			return actuals;
		},
		actualBoys() {
			let prboys = parseInt(this.prevRegisteredBoys);
			let newboys = parseInt(this.newBoys);
			let abands = parseInt(this.abandonedBoys);
			// calculate the actual girls
			const actuals = prboys - abands + newboys;
			return actuals;
		},

		newMembers() {
			return this.summer(this.newBoys, this.newGirls);
		},
		prevMembers() {
			return this.summer(this.prevRegisteredGirls, this.prevRegisteredBoys);
		},
		actualMembers() {
			return this.summer(this.actualGirls, this.actualBoys);
		},
		attendedMembers() {
			return this.summer(this.attendedGirls, this.attendedBoys);
		},
		abandonedMembers() {
			return this.summer(this.abandonedGirls, this.abandonedBoys);
		},

		girlsTaux() {
			if (this.attendedGirls > 0) {
				//   calculate percentage
				return this.percentager(this.attendedGirls, this.actualMembers) + "%";
			} else {
				return 0 + "%";
			}
		},

		boysTaux() {
			if (this.attendedBoys > 0) {
				//   calculate percentage
				return this.percentager(this.attendedBoys, this.actualMembers) + "%";
			} else {
				return 0 + "%";
			}
		},

		abandonboysTaux() {
			if (this.abandonedBoys > 0) {
				//   calculate percentage
				return (
					this.percentager(this.abandonedBoys, this.prevRegisteredBoys) + "%"
				);
			} else {
				return 0 + "%";
			}
		},
		abandongirlsTaux() {
			if (this.abandonedBoys > 0) {
				//   calculate percentage
				return (
					this.percentager(this.abandonedBoys, this.prevRegisteredGirls) + "%"
				);
			} else {
				return 0 + "%";
			}
		},
	},
	methods: {
		save(collectionDate) {
			this.$refs.menu.save(collectionDate);
		},

		percentager(percent, total) {
			return ((percent / total) * 100).toFixed(1);
		},

		summer(x, b) {
			let number1 = parseInt(x);
			let number2 = parseInt(b);
			if (number2 >= 0 && number1 >= 0) {
				return number1 + number2;
			} else {
				return 0;
			}
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
	font-size: 16px;
	color: rgb(0, 0, 0);
	font-style: italic;
	text-align: center;
	font-weight: bold;
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
.taux {
	font-size: 20px;
	text-transform: uppercase;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: 15px;
}
</style>
