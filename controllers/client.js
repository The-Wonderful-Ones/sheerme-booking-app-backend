const express = require("express");
const router = express.Router();
const connection = require("../config.js");

/*-----------------------------------------------------------------------
  Prefix of all routes is defined in index.js = /api/:company_id/client
---------------------------------------------------------------------- */

// GET ALL CLIENTS (/api/:company_id/client)
router.get("/", (req, res) => {
  const company_id = req.company_id;
  connection.query(
    "SELECT * FROM client WHERE company_id = ?",
    [company_id],
    (err, results) => {
      if (err) res.status(500).send(err);
      if (!results.length) {
        res.status(404).send({ message: "There were no clients found" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

// POST a client (/api/:company_id/client)
// companyId is sent within the body of this request and not needed via the req.params
router.post("/", (req, res, next) => {
  const formData = req.body;
  connection.query("INSERT INTO client SET ?", [formData], (error, results) => {
    if (error) res.status(500).send(error);
    const client_id = results.insertId;
    connection.query(
      "SELECT * FROM client WHERE id = ?",
      [client_id],
      (err, results) => {
        if (err) res.status(500).send(err);
        res.status(200).json(results);
      }
    );
  });
});

// PUT client (/api/:company_id/client/:client_id)
router.put("/:client_id", (req, res, next) => {
  const { client_id } = req.params;
  const formData = req.body;
  connection.query(
    "UPDATE client SET ? WHERE id = ?",
    [formData, client_id],
    (error, results) => {
      if (error) res.status(500).send(error);
      connection.query(
        "SELECT * FROM client WHERE id = ?",
        [client_id],
        (err, results) => {
          if (err) res.status(500).send(err);
          res.status(200).json(results);
        }
      );
    }
  );
});

// DELETE client (/api/:company_id/client/:client_id)
router.delete("/:client_id", (req, res, next) => {
  const { client_id } = req.params;
  connection.query(
    "DELETE FROM client WHERE id = ?",
    [client_id],
    (error, results) => {
      if (error) res.status(500).send(error);
      res.status(200).send({ message: "Client has been deleted successfully" });
    }
  );
});

module.exports = router;
