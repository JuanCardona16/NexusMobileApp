import { Dimensions, Platform, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	// Estilos base
	baseButton: {
		minWidth: 80,
		marginLeft: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
    borderRadius: 5,
    color: "#000"
	},
	// Toast
	toastContainer: {
		width: "80%",
		alignSelf: "center",
	},
	toastTop: {
		position: "absolute",
		top: Platform.OS === "ios" ? 60 : 30,
	},
	toastBottom: {
		position: "absolute",
		bottom: 30,
	},
	toastContent: {
		backgroundColor: "#333",
		borderRadius: 8,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	toastTitle: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 8,
	},
	toastText: {
		color: "#FFF",
		fontSize: 14,
	},

	// Elegant
	elegantContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	elegantContent: {
		width: "80%",
		backgroundColor: "#FFF",
		borderRadius: 12,
		overflow: "hidden",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 8,
	},
	elegantHeader: {
		backgroundColor: "#6200EE",
		padding: 20,
	},
	elegantTitle: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	elegantBody: {
		padding: 20,
	},
	elegantText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		lineHeight: 24,
	},
	elegantFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 16,
		borderTopWidth: 1,
		borderTopColor: "#EEE",
	},
	elegantButton: {
		flex: 1,
		marginHorizontal: 8,
		paddingVertical: 12,
		borderRadius: 6,
	},
	elegantConfirmButton: {
		backgroundColor: "#03DAC6",
	},
	elegantCancelButton: {
		backgroundColor: "#FFF",
		borderWidth: 1,
		borderColor: "#6200EE",
	},
	elegantButtonText: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},

	// Fullscreen
	fullscreenContainer: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	fullscreenHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: Platform.OS === "ios" ? 44 : 24,
		paddingHorizontal: 16,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#EEE",
	},
	fullscreenTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	fullscreenCloseButton: {
		padding: 8,
	},
	fullscreenBody: {
		flex: 1,
		padding: 16,
	},

	// Bottom Sheet (ya existente)
	bottomSheetContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.7)",
	},
	bottomSheetContent: {
		backgroundColor: "#FFF",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		padding: 24,
		maxHeight: height * 0.9,
	},

	// Confirmation
	// Estilos específicos de ConfirmationModal
	confirmationContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(166, 166, 166, 0.5)",
	},
	confirmationContent: {
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		width: "85%",
		overflow: "hidden",
	},
	confirmationHeader: {
		backgroundColor: "#F8F9FA",
		paddingVertical: 16,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "#E9ECEF",
	},
	confirmationTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#212529",
		textAlign: "center",
	},
	confirmationBody: {
		padding: 20,
	},
	confirmationText: {
		fontSize: 16,
		color: "#666",
		lineHeight: 24,
	},
	confirmationBottomConfirm: {
		color: "#fff",
	},
	confirmationFooter: {
		flexDirection: "row",
		justifyContent: "flex-end",
		padding: 16,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: "#e0e0e0",
	},
	cancelButton: {
		backgroundColor: "#f5f5f5",
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	confirmButton: {
    backgroundColor: "#6200EE",
    color: '#fff'
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "500",
		textAlign: "center",
	},
});
